'use client';

import React, { ChangeEvent, useState } from 'react';
import Input from '@mui/material/Input';
import GPXParser from 'gpxparser';

import { UseFormSetValue } from 'react-hook-form';
import { newEventSchema } from '@/schema/event';
import { DistanceInterface } from '@/interfaces/file';
import { z } from 'zod';

import styles from './styles.module.scss';
import { cleanSlopes } from '@/utils/gpx';

type ImportFileActivityProps = {
  setValue: UseFormSetValue<z.infer<typeof newEventSchema>>;
};

const ImportFileActivity = ({
  setValue,
}: ImportFileActivityProps) => {
  const [fileInfo, setFileInfo] = useState<
    | {
        name: string;
        elevation: number;
        distance: number;
      }
    | undefined
  >();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const gpx = new GPXParser();
        gpx.parse(text);
        const { tracks } = gpx;

        setFileInfo({
          name: tracks[0].name,
          elevation: tracks[0].elevation.pos,
          distance: tracks[0].distance.total / 1000,
        });

        setValue('gpxFile', {
          distance: tracks[0]
            .distance as unknown as DistanceInterface,
          elevation: tracks[0].elevation,
          points: tracks[0].points,
          slopes: cleanSlopes(tracks[0].slopes),
        });
      };

      reader.readAsText(file);
    } else {
      setFileInfo(undefined);
    }
  };

  return (
    <div className={styles.ImportFileActivity}>
      <Input
        type="file"
        inputProps={{ accept: '.gpx' }}
        onChange={handleChange}
      />

      {fileInfo ? (
        <ul>
          <li>
            <span>Nom du parcours :</span>{' '}
            <span>{fileInfo.name}</span>
          </li>
          <li>
            <span>Distance :</span>{' '}
            <span>{fileInfo.distance.toFixed(1)} kilomètre(s)</span>
          </li>
          <li>
            <span>Dénivelé :</span>{' '}
            <span>{fileInfo.elevation.toFixed(0)} mètres</span>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default ImportFileActivity;
