import { Injectable } from '@angular/core';
import { readdir, stat } from 'fs';
import { resolve as pathResolve } from "path";

@Injectable()
export class DiskExplorerService {

  constructor() { }

  public getEntries(path: string): Promise<{name: string, size: number, color: string, directory:boolean}[]> {
    return new Promise((resolve, reject) => {
      readdir(path, (err, entries: string[]) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(entries);
      })
    })
      .then(entries => {
        return Promise.all(entries.map((entry, entryIndex) => {
            return new Promise((resolve, reject) => {
              stat(pathResolve(path, entry), (err, entryStat) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(entryStat);
              })
            })
              .then((entryStat: {isDirectory: Function, size: number}) => {
                if (entryStat.isDirectory()) {
                   return this.getEntries(pathResolve(path, entry))
                      .then(sizes => {
                        return {
                          name: entry,
                          size: sizes.reduce((acc, curr) => acc + curr.size, 0),
                          directory: true
                        };
                      });
                } else {
                  return {
                    name: entry,
                    size: entryStat.size,
                    directory: false
                  };
                }
              });
          })
        );
      });
  }

}
