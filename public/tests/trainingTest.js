describe('trainingService', function () {
    var trainingService, $scope, $httpBackend, $http;

    var trainingList = [{
        id: '1',
        name: 'test1',
        description: 'desc1',
        isCompleted: true,
        exercises: []
    }, {
        id: '2',
        name: 'test2',
        description: 'desc2',
        isCompleted: false,
        exercises: []
    }];
    var single = {
        id: '2',
        name: 'test2',
        description: 'desc2',
        isCompleted: false,
        exercises: []
    };

    beforeEach(angular.mock.module('followFitnessApp'));

    beforeEach(function () {

        inject(function (_$http_) {
            $http = _$http_;
        });

        inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', /\/api\/1\/trainings/).respond(200, trainingList);
            $httpBackend.when('GET', /\/api\/1\/trainings\/(.+)/).respond(function (method, url, data, headers) {
                var args = url.match(/\/api\/1\/trainings\/(.+)/);
                for (i in trainingList) {
                    if (trainingList[i].id === args[1]) {
                        return [200, {training: trainingList[i]}];
                    }
                }
                return [400, {}];
            });
            inject(function (_trainingService_) {
                trainingService = _trainingService_;
            });
            inject(function ($rootScope) {
                $scope = $rootScope.$new();
            });
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should trainingService exist ', function () {
        expect(trainingService).toBeDefined();
    });


    describe('.getAll()', function () {
        it('should getAll exist', function () {
            expect(trainingService.getAll).toBeDefined();
        });

        it('should return a list of trainings', function () {
            var userResult;
            trainingService.getAll().then(function (result) {
                    userResult = result.data;
                }
            );
            $httpBackend.flush();
            expect(userResult).toEqual(trainingList);
        });
    });

    describe('function .get()', function () {
        // A simple test to verify the method findById exists
        it('should exist', function () {
            expect(trainingService.get).toBeDefined();
        });
        it('should return the first training object', function () {
            var userResult;
            trainingService.get(1).then(function (result) {
                    userResult = result.data;
                }
            );
            $httpBackend.flush();
            expect(userResult).toEqual(trainingList[0]);
        });
    });
});
