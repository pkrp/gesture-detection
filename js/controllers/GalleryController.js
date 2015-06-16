angular.module('Gallery.controllers', [])
    .controller('GalleryController', function($scope) {
        var opened = false;
        gest.start();
        $scope.images = [];
        for (i = 0; i < 24; i++) {
            $scope.images.push("ugmonk-iceland-" + i + ".jpg")
        }

        $scope.changeImage = function(newIndex) {
            if ($scope.images[newIndex]) {
                $scope.index = newIndex
            }
        };

        $scope.openModal = function(index) {
            $scope.changeImage(index);
            //var src = $(this).attr('ng-src');
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

        $scope.closeModal = function() {
            $('#imageModal').modal('hide');
            opened = false;
        }

        gest.options.subscribeWithCallback(function(gesture) {
            //handle gesture .direction .up .down .left .right .error
            if(!opened) {
                if (gesture.direction == "Long up" || gesture.direction == "Up") {
                    console.log("Move up")
                    $scope.openModal(1);
                    $scope.$apply();
                }    
            }
            

            if (opened) {
                if (gesture.direction == 'Left' && $scope.index > 0) {
                    $scope.index--;
                    $scope.$apply();
                    console.log("Show previous")
                } 
                else if (gesture.direction == 'Right' && $scope.index < $scope.images.length - 1) {
                    $scope.index++;
                    $scope.$apply();
                    console.log("Show next")
                }
                else if (gesture.direction == "Long down") {
                   console.log("Down")
                   $scope.closeModal();
                }
               

            } 
        });
});
