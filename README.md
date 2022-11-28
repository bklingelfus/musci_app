- - - - - - - - - - - - - LINK - - - - - - - - - - - - - - -
TBD

- - - - - - - - - - - - TECHs USED - - - - - - - - - - - - -
CORE: JavaScript, MongoDB, EJS, CSS
AUXILIARY: jQuery, Bootstrap

- - - - - - - - - - - - APPROACH - - - - - - - - - - - - - -
For this project my approach wasn't as solid as the first one. 
    1. The main part of the app is how the iframes interact work, so that the user can havea more dinamic ecperience;
    2. Started doing the same approach as always (block out pages > setup interactions > add style), but by the third day and in the end there were a lot of loose ends to fix in almost every step. So the order didn't help that much (also had to cut a lot of features that I first imagined). 

- - - - - - - - - - - USER STORIES - - - - - - - - - - - - -
The main idea of the site is to intergrate a music app with events tailored to the user. So for that I had mainly 5 actions for the user:
    1. Have a player that allows you to navigate and continue to have a smooth music experience;
    2. Do a basic user interface (so that we can have a more custom experience);
    3. Edit and modify your own preferences and songs;
    4. Have a search functionality for finding things;
    5. Be informed or offered differents events based on whatever is suited.

- - - - - - - - UNSOLVED PROBLEMs & IMPROVEMENTS - - - - - -
There are a lot of things that could be better:
    1. There are a lot of features missing from the original idea;
    2. Missing a lot of intereaction points for the user;
    3. A lot of things are not linked yet (play playlist, albuns, etc.);
    4. Missing user log-in and log-off, right now you are stuck on it or have to delete to get out;
    5. Probably not the best way to build the app, but since we had to use a lot routes that was the approach taken;
    6. There is 0 compatibility for mobile (to be fair an app like this would not need a site for mobile and more a store app);
    7. Should have probably used 3 collections for this project (Songs, Users, Playlists), but probably 4-5 would be the ideal from what I have experienced, that way it would be easier to accomodate all the information for all the features as well as for efficient use of MongoDB (Songs, Users, Playlists, Artists, Albuns);
    8. Because of the iframes a lot of the refreshing and navigating is not as easy and far from the best that it could be both in terms of performance, code and user experience;
    9. Still have a bug where favorites songs can be duplicated and the star reference doesn't update right;
    10. The player ranges (for volume and track time) don't work for the time and don't have style for the volume because from what I have searched it is a pain to style one range and it still looks bad, so probably better to build one from scratch, but I did not have time.

