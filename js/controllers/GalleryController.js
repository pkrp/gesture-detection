angular.module('Gallery.controllers', [])
    .controller('GalleryController', function($scope) {
        var opened = false;
        gest.start();
        $scope.images = [];
        for (i = 0; i < 22; i++) {
            $scope.images.push("Snapshot_20130108_" + i + ".jpg")
        }

        $scope.changeImage = function(newIndex) {
            if ($scope.images[newIndex]) {
                $scope.index = newIndex
            }
        };

        $scope.openModal = function(index) {
            $scope.index= index;
            var src = $(this).attr('ng-src');
            $('#imageModal').modal();
            $('#imageModal').on('shown.bs.modal', function(){
                opened = true;
                $('#myModal .modal-body').html();
            });
            $('#imageModal').on('hidden.bs.modal', function(){
                opened = false;
                $('#myModal .modal-body').html('');
            });
        };

        gest.options.subscribeWithCallback(function(gesture) {
            //handle gesture .direction .up .down .left .right .error
            if (opened) {
                if (gesture.direction == 'Left' && $scope.index > 0) {
                    $scope.index--;
                    $scope.$apply();
                }
                if (gesture.direction == 'Right' && $scope.index < $scope.images.length - 1) {
                    $scope.index++;
                    $scope.$apply();
                }
            }
        });
});
