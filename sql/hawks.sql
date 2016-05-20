create table Hawks
(
           name text,                              -- A Bird's name
         gender text,                              -- M/F
    yearHatched integer,                           -- YYYY
     bandNumber text primary key not null,         -- unique bird ID number
  fatherBandNum text references Hawks(bandNumber), -- Hawks Father
  motherBandNum text references Hawks(bandNumber), -- Hawks Mother
           cdwc text,                              -- CB | WC (Captive Bred|Wild Caught)
          owner text references Contact(sid),      -- Salesforce ID
         breder text references Contact(sid),
  originCountry text,                              -- Country origin
    originState text,                              -- State origin
 originLocality text,                              -- Locality origin
            yod integer,                           -- Year of death
            cod text,                              -- Cause of death
       comments text,                              -- Alt Band / Comments
     lastUpdate date,                              -- Last updated
         weight integer,                           -- Weight (g)
        seasons integer,                           -- Seasons
        rabbits integer,                           -- Rabbits
          hares integer,                           -- Hares
      squirrels integer,                           -- Squirrels
     uplandFowl integer,                           -- Upland non waterfowl game bird
      waterfowl integer,                           -- Waterfowl
   miscCritters integer,                           -- Misc
     bestSeason integer,                           -- Kills best season
        overall integer,                           -- Overall
   groupHunting integer,                           -- Group
           dogs integer,                           -- Dogs
 followPosition integer,                           -- Follow/position
          speed integer,                           -- Speed
        footing integer,                           -- Footing
    persistence integer,                           -- Persistence
huntingComments text,                              -- Hunting comments
);
