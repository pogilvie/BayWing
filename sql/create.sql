create table HawksJoined
(
            name text,         -- A Bird's name
          gender text,         -- M/F
     yearHatched integer,      -- YYYY
      fatherName text,         -- Name of the father
      motherName text,         -- Name of the mother
      bandNumber text,         -- unique bird ID number
            cdwc text,         -- CB | WC (Captive Bred|Wild Caught)
          spacer null,         -- this field intentionally left blank
      bandFather text,         -- Band number of the father (External ID)
      bandMother text,         -- Band number of the mother (External ID)
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
      totalKills integer,      -- Total Kills
      bestSeason integer,      -- Kills best season
ownersBestSeason text,         -- Owner best season  ** custom contact field **
         overall integer,      -- Overall
    groupHunting integer,      -- Group
            dogs integer,      -- Dogs
  followPosition integer,      -- Follow/position
           speed integer,      -- Speed
         footing integer,      -- Footing
     persistence integer,      -- Persistence
 huntingComments text,         -- Hunting comments
          blank1 null,         --
          blank2 null,         --
          blank3 null,         --
          blank4 null,         --
           form1 null,         -- unknown formula
           form2 null,         -- unknown formula
           form3 null          -- unknown formula
);
