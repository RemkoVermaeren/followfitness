describe('trainingService', function () {
    var trainingService, $scope, $httpBackend, $http;

    var trainingList = [{
        id: 1,
        name: 'test1',
        description: 'desc1',
        isCompleted: true,
        exercises: []
    }, {
        id: 2,
        name: 'test2',
        description: 'desc2',
        isCompleted: false,
        exercises: []
    }];

    beforeEach(angular.mock.module('followFitnessApp'));

    beforeEach(function () {

        inject(function (_$http_) {
            $http = _$http_;
        });

        inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', /\/api\/1\/trainings/).respond(200, trainingList);
            $httpBackend.when('GET', /\/api\/1\/trainings\/(.+)/).respond(function (method, url, data, headers,params) {
                var args = url.match(/\/api\/1\/trainings\/(.+)/);
                for (i in trainingList) {
                    if (trainingList[i].id === parseInt(args[1])) {
                        return [200, trainingList[i]];
                    }
                }
                return [400, {}];
            });
            $httpBackend.when('PUT', /\/api\/1\/trainings\/(.+)\/reverseiscompleted/).respond(function(method, url, data, headers,params) {
                var args = url.match(/\/api\/1\/trainings\/(.+)\/reverseiscompleted/);
                console.log(args);
                for (i in trainingList) {
                    if (trainingList[i].id === parseInt(args[1])) {
                        trainingList[i].isCompleted = !trainingList[i].isCompleted;
                        return [200, trainingList[i]];
                    }
                }
                return [400, {}];
            });
        });
        inject(function ($injector) {
            trainingService = $injector.get('trainingService');
        });
        inject(function ($rootScope) {
            $scope = $rootScope.$new();
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
            trainingService.getAll().then(function (result) {
                    $scope.trainings = result.data;
                }
            );
            $httpBackend.flush();
            expect($scope.trainings).toEqual(trainingList);
        });
    });

    describe('function .get()', function () {
        it('should exist', function () {
            expect(trainingService.get).toBeDefined();
        });
        it('should return the first training object', function () {
            trainingService.get(1).then(function (result) {
                    $scope.training = result.data;
                }
            );
            $httpBackend.flush();
            expect($scope.training[0]).toEqual(trainingList[0]);
        });
    });
    describe('function reverseIsCompleted', function () {
        it('should exist', function () {
            expect(trainingService.reverseIsCompleted).toBeDefined();
        });
        it('should return reverse of the property isCompleted', function () {
            var result;
            trainingService.reverseIsCompleted(1).then(function(result){
                $scope.training = result.data;
            });
            $httpBackend.flush();
            expect($scope.training.isCompleted).toEqual(false);
        });
    });});
