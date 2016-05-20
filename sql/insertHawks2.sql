-- INSERT INTO tableName (columnName, ...) SELECT queryStatement;


-- all the normalized data except contact foreign keys
insert into Hawks
    (name,gender,yearHatched,bandNumber,cdwc,bandFather,bandMother,
     originCountry,originState,originLocality,yod,cod,comments,lastUpdate,weight,
     seasons,rabbits,hares,squirrels,uplandFowl,waterfowl,miscCritters,bestSeason,
     overall,groupHunting,dogs,followPosition,speed,footing,persistence,
     huntingComments)
select name,gender,yearHatched,bandNumber,cdwc,bandFather,bandMother,
 originCountry, originState,originLocality,yod,cod,comments,lastUpdate,
 weight, seasons,rabbits,hares,squirrels,uplandFowl,waterfowl,miscCritters,
 bestSeason, overall,groupHunting,dogs,followPosition,speed,footing,persistence,
 huntingComments
 from HawksOld;
