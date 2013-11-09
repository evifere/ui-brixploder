###Introduction

ui-brixploder project is a brick breaker game - Online Demo here http://evifere.lescigales.org/ui-brixploder/

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


###Déclaration of the first level

The application consumes xml format configuration 

```html
<head level="interrogation">
```
you use the level attribute to define the xml stored in xml folder to be loaded on start


###XML Configuration

The root tag is level.
The grid tag define the row of brick to draw
The nextLevels contains the name of the next Level ficle configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<level>
<grid>


<row id="23">
 <brick id="3"></brick>
</row>

</grid>
<nextlevels>
<nextlevel>2</nextlevel>
</nextlevels>
</level>

```

####Draw a full row of brick

```xml
<row id="0" full="true"></row>
```

####Draw single brick
Use visibility to decalre if the brick is visble or not.
Use solidity to define how many time you must touch the brick before destroying it.

```xml
<row id="0">
<brick id="0" visible="true" solidity="0" ></brick>
<brick id="3" visible="true" solidity="0" ></brick>
</row>
```


