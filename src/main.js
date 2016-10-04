import Header from './directives/header/Header';
import Popup from './directives/popup/Popup';
import NoteContainer from './directives/noteContainer/NoteContainer';
import Note from './directives/note/Note';
import MainController from './controllers/MainController';
import IndexedDBService from './services/IndexedDBService';

angular.module('ntApplication', [])
    .factory('indexedService', IndexedDBService)
    .controller('mainCtrl', MainController)
	.directive('ntHeader', Header)
	.directive('ntPopup', Popup)
	.directive('ntContainer', NoteContainer)
	.directive('ntNote', Note);