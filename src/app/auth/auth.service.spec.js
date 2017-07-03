/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var auth_guard_service_1 = require("./auth-guard.service");
describe('AuthService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [auth_guard_service_1.AuthGuard]
        });
    });
    it('should ...', testing_1.inject([auth_guard_service_1.AuthGuard], function (service) {
        expect(service).toBeTruthy();
    }));
});
