export default function MainController($scope, indexedService) {
	indexedService.getAllNotes().then((result) => {
		$scope.noteList = result;
	});
}