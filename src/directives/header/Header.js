export default function Header($compile) {

	let directive = {
		restrict: 'E',
		templateUrl: 'directives/header/header.html',
		controller: HeaderCtrl,
		bindToController: true
	};

	return directive;
}

class HeaderCtrl {
	constructor ($compile) {
		document.querySelector('.add-btn').addEventListener('click', ($scope) => {
			var popupTemplate = $compile('<nt-popup></nt-popup>')($scope);
			angular.element(document.body).append(popupTemplate);
		});
	}
}