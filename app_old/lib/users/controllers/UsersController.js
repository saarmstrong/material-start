/**
 * Main App Controller for the Angular Material Starter App
 * @param $scope
 * @param $mdSidenav
 * @param avatarsService
 * @constructor
 */
function UsersController(usersService, $mdSidenav, $mdBottomSheet, $log ) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;
  self.share        = share;

  // Load all registered users

  usersService
        .loadAllUsers()
        .then( function( users ) {
          self.users    = [].concat(users);
          self.selected = users[0];
        });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }

  /**
   * Show the bottom sheet
   */
  function share($event) {
    var user = self.selected;

    $mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: 'lib/users/view/contactSheet.html',
      controller: [ '$mdBottomSheet', UserSheetController],
      controllerAs: "vm",
      bindToController : true,
      targetEvent: $event
    }).then(function(clickedItem) {
      $log.debug( clickedItem.name + ' clicked!');
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function UserSheetController( $mdBottomSheet ) {
      this.user = user;
      this.items = [
        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
      ];
      this.performAction = function(action) {
        $mdBottomSheet.hide(action);
      };
    }
  }
}

export default [ 'usersService', '$mdSidenav', '$mdBottomSheet', '$log', UsersController ];

