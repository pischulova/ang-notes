export default function NoteContainer() {
	return {
		restrict: 'E',
		templateUrl: 'directives/note/note.html',
		scope: {
			note: '='
		}
	}
}