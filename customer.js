var app = angular.module('myApp', []);

app.controller('customersCtrl', function ($scope, $http, $timeout) {

    

    $scope.isCustomerCreated = false;
    $http.get("http://localhost:8080/api/customers")

        .then(function (response) {
            $scope.namesx = response.data;

        });

    $scope.postdata = function (firstName, lastName, email) {
        var data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            status: 1
        };

        //Call the services
        $http.post('http://localhost:8080/api/customers', JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Customer Created Successfully!";
            $scope.isCustomerCreated = false;
            $scope.firstName = "";
            $scope.lastName = "";
            $scope.email = "";
            $timeout(function () {
                $scope.isCustomerCreated = true;
            }, 5000);
            
            $http.get("http://localhost:8080/api/customers")

                .then(function (response) {
                    $scope.names = response.data;

            });
        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();
        });
    };
    
});

app.service('simpleService', function ($http) {

    this.squareofnumber = function (x) {
    
    return x * x;
    
    }
    
    });