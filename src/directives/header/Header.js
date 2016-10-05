export default function Header($compile, indexedService) {

	return {
		restrict: 'E',
		templateUrl: 'directives/header/header.html',
		controller: HeaderCtrl,
		bindToController: true
	}
}

class HeaderCtrl {
	constructor ($compile, indexedService) {
		document.querySelector('.add-btn').addEventListener('click', ($scope) => {
			var popupTemplate = $compile('<nt-popup></nt-popup>')($scope);
			angular.element(document.body).append(popupTemplate);
		});
	}
}