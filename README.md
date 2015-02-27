# Tetris
![tetris](http://oyster.ignimgs.com/mediawiki/apis.ign.com/tetris-ultimate/7/7c/Tetris_art.0_cinema_1920.0.jpg)
This is a classic version of the game Tetris for anybody who might enjoy a bit of nostalgia.  You can play it live [here][game_link].  For details on gameplay and history you can visit the [wikipedia entry][wiki_tetris].
[wiki_tetris]: http://en.wikipedia.org/wiki/Tetris
[game_link]: http://www.bryceyoung.net/tetris

## The Code
I used Canvas and Javascript to draw the game and divided it up into the classes:
* GameView - manages input and the start/reset of the game
* Game - the actual game that runs, reponsible for drawing itself, and the functions and logic of such as making pieces fall, creating pieces, removing full rows, dropping new pieces, etc.
* Piece - the piece that randomly chooses its shape and on creation, can move around and rotate.  The blocks are represented as single point offsets from the location of the piece.

I decided to just use a 2d array to keep track of all of the locations of the blocks in the game class instead of making a grrd/board class to do that.  As a result, things like detecting/removing rows and collisions are in the game class.  I realize this is a little sloppy and can get messy but keeps things simple for my smaller implementation.  

## Todo
* Create a board class and move some of the functionality out of the game class
* Add a cascading mode
  * draw a border around the pieces instead of around the individual blocks
  * keep the frozen blocks as whole pieces instead of individual pieces
  * add cascading to the row removal
