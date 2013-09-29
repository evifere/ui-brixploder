###Introduction

ui-brixploder project is a brick breaker game

it is a full jQuery UI widget project.

The first version has the following features:

level management with XML file.
collision management for brick and bar collision.
solidy for bricks

###Dependencies

```html
 
  
  <!-- External Libs-->
  
  <script type="text/javascript" src="./js/ext/jquery-1.5.1.min.js"></script>
  <script type="text/javascript" src="./js/ext/jquery.cookie.js"></script>        
  <script type="text/javascript" src="./js/ext/jquery-ui-1.8.9.custom.min.js"></script>
 
  <!-- Internal Libs-->
  
   <script type="text/javascript" src="./js/core/ui-brixploder-tools.js"></script>
   <script type="text/javascript" src="./js/core/ui-brixploderbar.js"></script> 
   <script type="text/javascript" src="./js/core/ui-brixploderbrick.js"></script>
   <script type="text/javascript" src="./js/core/ui-brixploderball.js"></script>
   <script type="text/javascript" src="./js/core/ui-brixploder.js"></script>
   <script type="text/javascript" src="./js/core/ui-brixploder-instance.js"></script> 

```

###Ui-Brixploder Widget options


| Option        | default          | Description  |
| ------------- |:-------------:| -----:|
|bricks |0 |Nombre de briques du niveau|
|barwidth |80 |largeur en pixel de la barre|
|barheight |12 |hauteur de la barre en pixels|
|bartop |450 |position top de la barre|
|barleft |100 |position left de la barre|
|ballwidth |6 |largeur en pixel de la balle|
|balltop |400 |position top de la balle|
|ballleft |100 |position left de la balle|
|brickwidth |20 |largeur en pixel de la brique|
|brickheight |12 |hauteur de la brique en pixels|
|gridwidth |360 |largeur en pixel de la grille de jeu|
|gridheight |500 |hauteur de la grille de jeu en pixels|
|gridtop |50 |position top de la grille de jeu|
|gridleft |50 |position left de la grille de jeu|
|lives |3 |Nombre de vies|

###Ui-Brixploderbar Widget options

| Option        | default          | Description  |
| ------------- |:-------------:| -----:|
|width |360 |largeur en pixel de la barre|
|height |500 |hauteur de la barre en pixels|
|top |50 |position top de la barre|
|left |50 |position left de la barre

###Ui-Brixploderbrick Widget options

| Option        | default          | Description  |
| ------------- |:-------------:| -----:|
|solidity |1 |brick resistance|


###Ui-Brixploderbrick Widget options

| Option        | default          | Description  |
| ------------- |:-------------:| -----:|
|width |6 |largeur en pixel de la balle|
|height |6 |hauteur de la balle en pixels|
|top |50 |position top de la balle|
|left |50 |position left de la balle|
