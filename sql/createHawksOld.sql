create table Hawks
(
            name text,         -- A Bird's name
          gender text,         -- M/F
     yearHatched integer,      -- YYYY
      bandNumber text primary key not null,         -- unique bird ID number
            cdwc text,         -- CB | WC (Captive Bred|Wild Caught)
      bandFather text references Hawks(bandNumber),         -- Foreign Key
      bandMother text references Hawks(bandNumber),         -- Foreign Key
           owner text,         -- -> Salesforce Contact
         breeder text,         -- -> Salesforce Contact
   originCountry text,         -- Country origin
     originState text,         -- State origin
  originLocality text,         -- Locality origin
     disposition text,         -- Disposition  (dead or alive?)
             yod integer,      -- Year of death
             cod text,         -- Cause of death
        comments text,         -- Alt Band / Comments
      lastUpdate date,         -- Last updated
          weight integer,      -- Weight (g)
         seasons integer,      -- Seasons
         rabbits integer,      -- Rabbits
           hares integer,      -- Hares
       squirrels integer,      -- squirrels
      uplandFowl integer,      -- Upland
       waterfowl integer,      -- Waterfowl
    miscCritters integer,      -- Misc
      bestSeason integer,      -- Kills best season
         overall integer,      -- Overall
    groupHunting integer,      -- Group
            dogs integer,      -- Dogs
  followPosition integer,      -- Follow/position
           speed integer,      -- Speed
         footing integer,      -- Footing
     persistence integer,      -- Persistence
 huntingComments text          -- Hunting comments
);
