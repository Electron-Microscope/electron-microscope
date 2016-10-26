import { Injectable } from '@angular/core';
import { readdir, stat } from 'fs';
import { resolve as pathResolve } from "path";
import { isArray } from 'util';

@Injectable()
export class DiskExplorerService {

  //private colorPalette = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA',
  // '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
  private colorPalette = [];
    private defaultColor = '#006600';

  constructor() { }

  getColor():String {
    if(this.colorPalette.length > 0) {
      return this.colorPalette.pop();
    } else {
      //return this.defaultColor;
      return this.colorPalette.push('#' + (function co(lor){   return (lor +=
          [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
        && (lor.length == 6) ?  lor : co(lor); })(''));
    }
  }

  initColors() {
    for (let i = 0; i < 30; i++) {
      this.colorPalette.push('#' + (function co(lor){   return (lor +=
          [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
        && (lor.length == 6) ?  lor : co(lor); })(''));
    }
  }

  public getEntries(path: string): Promise<{name: string, size: number, color: string, directory:boolean}[]> {
    this.initColors();

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
        return Promise.all(entries.map(entry => {
            return new Promise((resolve, reject) => {
              stat(pathResolve(path, entry), (err, entryStat) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(entryStat);
              })
            })
              .then(entryStat => {
                if (entryStat.isDirectory()) {
                  if (entry == "node_modules") {
                    return {
                      name: entry,
                      size: 0,
                      color: '#000000',
                      directory: true
                    };
                  } else {
                   return this.getEntries(pathResolve(path, entry))
                      .then(sizes => {
                        return {
                          name: entry,
                          size: sizes.reduce((acc, curr) => acc + curr.size, 0),
                          color: this.getColor(),
                          directory: true
                        };
                      });
                  }
                } else {
                  return {
                    name: entry,
                    size: entryStat.size,
                    color: this.getColor(),
                    directory: false
                  };
                }
              });
          })
        );
      });
  }

}
