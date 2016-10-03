import Header from './directives/header/Header';
import Popup from './directives/popup/Popup';

angular.module('ntApplication', [])
	.directive('ntHeader', Header)
	.directive('ntPopup', Popup);