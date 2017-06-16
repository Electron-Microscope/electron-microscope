"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var os_1 = require("os");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/timestamp");
require("rxjs/add/operator/mergeMap");
var CpuLoadService = (function () {
    function CpuLoadService() {
    }
    /**
     * Returns the number of CPUs of the machine
     * @return {number} the number of CPUs
     */
    CpuLoadService.prototype.getNumberOfCPUs = function () {
        return os_1.cpus().length;
    };
    /**
     * Generates an Observable which emits cpu load information in a given interval
     * @param interval {number} Interval in seconds
     * @return {Observable<R>} Observable, which emits cpu load information as Objects. The Result Objects contain the
     * measurement time in Unixtime milliseconds (timestamp), the number of the current measurement (sequenceNumber) and
     * the Array of cpu loads (loads) for each core, as well as the load for the whole cpu (last element of loads) as relative numbers
     */
    CpuLoadService.prototype.getCPULoadInInterval = function (interval) {
        var _this = this;
        if (interval === void 0) { interval = 0; }
        return Rx_1.Observable
            .interval(interval * 1000)
            .timestamp()
            .flatMap(function (x) {
            return Rx_1.Observable.create(function (obs) {
                Promise.all(os_1.cpus().map(function (val, ind) { return _this.currentCPULoad(ind); })
                    .concat(_this.currentCPULoad(undefined))).then(function (loads) {
                    obs.next({
                        loads: loads,
                        speeds: os_1.cpus().map(function (cpu) { return cpu.speed; }).concat(Math.round(os_1.cpus().reduce(function (prev, curr) { return prev + curr.speed; }, 0) / os_1.cpus().length)),
                        timestamp: new Date(x.timestamp),
                        sequenceNumber: x.value
                    });
                    obs.complete();
                });
            });
        });
    };
    CpuLoadService.prototype.currentCPULoad = function (cpu) {
        var _this = this;
        return new Promise(function (resolve, _) {
            var ref = _this.currentCPUAverage(cpu);
            setTimeout(function () {
                var curr = _this.currentCPUAverage(cpu);
                var idleDiff = curr.idle - ref.idle;
                var totalDiff = curr.total - ref.total;
                resolve(idleDiff / totalDiff);
            }, 100);
        });
    };
    /**
     * Returns the current cpu load average
     * @param cpu {number | undefined } if a number is provided, the average for this cpu core si provided, otherwise the average of the
     *        whole cpu
     * @return {{idle: number, total: number}} idle and total time for the core / the cpu
     */
    CpuLoadService.prototype.currentCPUAverage = function (cpu) {
        var cpusInformation = cpu ? [os_1.cpus()[cpu]] : os_1.cpus();
        var times = cpusInformation.reduce(function (prev, curr) {
            return {
                idle: prev.idle + curr.times.idle,
                total: prev.total + Object.keys(curr.times).reduce(function (prevTotal, currKey) { return prevTotal + curr.times[currKey]; }, 0)
            };
        }, { idle: 0, total: 0 });
        return { idle: times.idle / cpusInformation.length, total: times.total / cpusInformation.length };
    };
    return CpuLoadService;
}());
CpuLoadService = __decorate([
    core_1.Injectable()
], CpuLoadService);
exports.CpuLoadService = CpuLoadService;
