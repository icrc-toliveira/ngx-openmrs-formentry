import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataSources = class DataSources {
    constructor() {
        this._dataSources = {};
    }
    get dataSources() {
        return this._dataSources;
    }
    registerDataSource(key, dataSource, unWrap = false) {
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (const o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    }
    clearDataSource(key) {
        delete this._dataSources[key];
    }
};
DataSources = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], DataSources);
export { DataSources };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUVwQjtRQURRLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBRS9CLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVcsRUFBRSxVQUFlLEVBQUUsTUFBTSxHQUFHLEtBQUs7UUFDM0QsSUFBSSxNQUFNLEVBQUU7WUFDUixpQ0FBaUM7WUFDakMsS0FBSyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBRUosQ0FBQTtBQTNCWSxXQUFXO0lBRHZCLFVBQVUsRUFBRTs7R0FDQSxXQUFXLENBMkJ2QjtTQTNCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZXMge1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXQgZGF0YVNvdXJjZXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VzO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGF0YVNvdXJjZShrZXk6IHN0cmluZywgZGF0YVNvdXJjZTogYW55LCB1bldyYXAgPSBmYWxzZSkge1xuICAgICAgICBpZiAodW5XcmFwKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBpbiBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyaW5nJywgbywgZGF0YVNvdXJjZVtvXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRhdGFTb3VyY2UobywgZGF0YVNvdXJjZVtvXSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2VzW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignT3ZlcnJpZGluZyByZWdpc3RlcmVkIGRhdGEgc291cmNlJywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhU291cmNlc1trZXldID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cbiAgICBjbGVhckRhdGFTb3VyY2Uoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFTb3VyY2VzW2tleV07XG4gICAgfVxuXG59XG4iXX0=