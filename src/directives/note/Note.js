export default function NoteContainer() {
	let directive = {
		restrict: 'E',
		templateUrl: 'directives/note/note.html',
		scope: {
			note: '='
		}
	};

	return directive;
}