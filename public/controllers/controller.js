function AppCtrl($scope, $http){
	console.log("Hello world from controller");
	
	var refresh = function(){
		$http.get('/person').success(function(res){
			console.log("I got the data i needed!");
			$scope.personList=res;
			$scope.person="";
		});
	};

	refresh();

	$scope.addPerson = function(){
		console.log("add button clicked");
		console.log($scope.person);
		$http.post('/person',$scope.person).success(function(response){
			console.log(response);
			refresh();
		});	
	};

	$scope.remove = function(id){
		console.log("Remove "+id);
		$http.delete('/person/'+id).success(function(response){
			console.log("Delete response js "+response);
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log("Edit id "+id);
		$http.get('/person/'+id).success(function(response){
			$scope.person=response;
		});
	};

	$scope.update = function(){
		$http.put('/person/'+$scope.person._id,$scope.person).success(function(response){
			refresh();
		});
	};

	$scope.clear = function(){
		$scope.person="";
	}
}