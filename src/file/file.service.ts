import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async createFile(file): Promise<string> {
    const fileName = uuid.v4() + '.jpg';
    const filePath = path.resolve(__dirname, '..', 'static');

    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, { recursive: true }, (err) => {
        if (err)
          throw new HttpException(
            'Something wrong with server',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      });
    }

    fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
      if (err) {
        throw new HttpException(
          'Error! Something has gone wrong while image was saving',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });

    return fileName;
  }
}
