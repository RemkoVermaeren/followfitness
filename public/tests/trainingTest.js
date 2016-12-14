describe('Users factory', function() {
    var trainingService;
    var authService;
    var $scope;
    var $httpBackend, $http;

    var trainingList = [{
        id: '1',
        name: 'test'

    }, {
        id: '2',
        name: 'test2'
    }

    ];




    // Before each test load our api.users module
    beforeEach(angular.mock.module('followFitnessApp'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(function() {
        inject(function(_trainingService_) {
            trainingService = _trainingService_;
        });
        inject(function(_authService_){
            authService = _authService_;
        });

        inject(function(_$http_) {
            $http = _$http_;
        });

        inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', /\/api\/1\/trainings/).respond(200, trainingList);
            $httpBackend.when('GET', /\/api\/1\/trainings\/(.+)/).respond(function(method, url, data, headers,params){
                var args = url.match(/\/api\/1\/trainings\/(.+)/);
                console.log(params);
                for (i in trainingList) {
                    if (trainingList[i].id === args[1]) {
                        trainingList[i] = data;
                        return [200, trainingList[i]];
                    }
                }
                return [400, {}]; // args[1] is de waarde tussen de haakjes in de reguliere expressie
            });


        });

        inject(function($rootScope) {
            $scope = $rootScope.$new();
        });
    });

    afterEach(function() { // Altijd plaatsen zodat alle calls die niet werden beantwoord errors geven
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the Users factory exists
    it('should exist', function() {
        expect(trainingService).toBeDefined();
    });



    describe('.getAll()', function() {
        it('should exist', function() {
            expect(trainingService.getAll).toBeDefined();
        });

        it('should return a list of users', function() {
            var userResult;
            trainingService.getAll().then(function(result) {
                    userResult = result.data;
                }
            );
            $httpBackend.flush();
            expect(userResult).toEqual(trainingList);


        });

    });

    describe('.get()', function() {
        // A simple test to verify the method findById exists
        it('should exist', function() {
            expect(trainingService.get).toBeDefined();
        });

        it('should return one user object if it exists', function() {
            var userResult;
            trainingService.get('2').then(function(result) {
                    userResult = result.data;
                }
            );
            $httpBackend.flush();
            expect(userResult).toEqual(trainingList[1]);
        });

    });

    // describe('.update()',function(){
    //     it('should exist', function() {
    //         expect(trainingService.update).toBeDefined();
    //     });
    //
    //     it('should return updated user object if it exists', function() {
    //
    //         var userResult;
    //         trainingService.update('2', singleUserUpdate).then(function(result) {
    //                 userResult = result.data;
    //             }
    //
    //         );
    //         $httpBackend.flush();
    //         expect(userResult.username).toEqual("broervantest");
    //         expect(userResult.id).toEqual("2");
    //     });
    //
    // });




});