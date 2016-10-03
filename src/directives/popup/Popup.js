export default function Popup() {

	let directive = {
		restrict: 'E',
		templateUrl: 'directives/popup/popup.html',
		controller: PopupCtrl,
		bindToController: true
	};

	return directive;
}

class PopupCtrl {
	constructor () {
		document.querySelector('.exit').addEventListener('click', this.delete);
		//change to angular methods
	}

	delete() {
		document.body.removeChild(document.querySelector('.popup').parentElement);
	}
}