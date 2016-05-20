
-- Insert/update Contacts with malformed fullName
insert into Contacts (firstName,lastName,fullName) Values('Alejandro','Padres','Padres: Alejandro');
insert into Contacts (firstName,lastName,fullName) Values('Museum','Arizona Sonora Desert','Arizona Sonora Desert Museum');
insert into Contacts (firstName,lastName,fullName) Values('Florida','Audubon Society','Florida Audubon Society');
insert into Contacts (firstName,lastName,fullName) Values('Peregine','The Peregrine','The Peregrine Fund');
insert into Contacts (firstName,lastName,fullName) Values('Club','British Falconers','British Falconers Club');
insert into Contacts (firstName,lastName,fullName) Values('Jonathan','Millican','Millican: Jonathan');
insert into Contacts (firstName,lastName,fullName) Values('Doug','Hogan','Hogan: Doug');
insert into Contacts (firstName,lastName,fullName) Values('Alabama','4-H Center','Alabama 4-H Center');
insert into Contacts (firstName,lastName,fullName) Values('World','Bird Sanctuary','World Bird Sanctuary');
insert into Contacts (firstName,lastName,fullName) Values('Georgia','Southern','Georgia Southern');
insert into Contacts (firstName,lastName,fullName) Values('Sea','World','Sea World');
insert into Contacts (firstName,lastName,fullName) Values('Island','Discovery','Discovery Island');
insert into Contacts (firstName,lastName,fullName) Values('Falconry','British School of','British School of Falconry');
insert into Contacts (firstName,lastName,fullName) Values('International','Bird Control','Bird Control International');
update hawksOld set owner = 'Arizona Sonora Desert Museum' where owner = 'Sonoran Desert Museum';
insert into Contacts (firstName,lastName,fullName) Values('Fred','Berry','Berry; Fred; Sr.');
insert into Contacts (firstName,lastName,fullName) Values('Fred','Berry','Berry; Fred; Jr.');


--  Verify that we can do a reasonable join between Hawks and Contacts
--  Find the Last Names of 10 owners by Hawk band number

        select  Hawks.bandNumber,Contacts.lastName
          from  Hawks,Contacts
         where  Hawks.owner = Contacts.rowid limit 10 offset 200;

--    bandNumber  lastName
--    ----------  ----------
--    RW094819    Stiens
--    RX084016    Robinson
--    RW094300    Nelson
--    RW094811    Kirkwood
--    RW094825    Mackey
--    RW094820    Slickers
--    RW086347    Coblenz
--    RW094822    Neeley
--    RW095750    Borman
--    RW095949    Otis


-- Find the lastNames of the Breeder of a hawk given by band number
--
       select Hawks.bandNumber, Breeder.lastName
         from Hawks, Contacts as Breeder
        where Hawks.breeder = Breeder.rowid
        limit 10 offset 200;

--     bandNumber  lastName
--    ----------  ----------
--     RW094819    Pike
--     RX084016    Pike
--     RW094300    Pike
--     RW094811    Pike
--     RW094825    Pike
--     RW094820    Pike
--     RW086347    Pike
--     RW094822    Pike
--     RW095750    Pike
--     RW095949    Pike

       select Hawks.bandNumber, Owner.lastName, Breeder.lastName
         from Hawks, Contacts as Owner, Contacts as Breeder
        where Hawks.breeder = Breeder.rowid and Hawks.owner = Owner.rowid
        limit 10 offset 200;

--     bandNumber  lastName    lastName
--    ----------  ----------  ----------
--     RW094819    Stiens      Pike
--     RX084016    Robinson    Pike
--     RW094300    Nelson      Pike
--     RW094811    Kirkwood    Pike
--     RW094825    Mackey      Pike
--     RW094820    Slickers    Pike
--     RW086347    Coblenz     Pike
--     RW094822    Neeley      Pike
--     RW095750    Borman      Pike
--     RW095949    Otis        Pike

-- Find all Hawks with nonunique bandNumbers

select name, bandNumber from HawksJoined where bandNumber in
(select bandNumber from HawksJoined group by bandNumber having count(*) > 1);

--sqlite> .read ../nonuniqueBandNumber.sql
--    name        bandNumber
--   ----------   ----------
--    BA29        RW100925
--    Bob         RW100925
--    Namu        RW096209
--    Nata        RW096209
--    TJC1060     RW102489
--    Yona        RW102489


-- What is the most likely Cause of Death

sqlite> select count(cod),cod from Hawks group by cod;
--1602
--2       Aspergillosis
--3       Carbon monoxide
--1       Choked on food
--1       Collision with car
--1       Congestive heart failure
--3       Disease
--7       Electrocution
--5       Euthanized
--1       Gout
--1       Granulomas?
--5       Injury by another hawk
--5       Injury by quarry
--26      Katrina
--1       Kidney
--1       Lost on kill in blizzard
--1       Old age
--1       Other hunting injury
--2       Other non-hunting injury
--1       Owl
--1       Predator
--1       Respiratory illness
--1       Swallowed sharp bone
--1       Trichomoniasis
--6       Unknown
--4       West Nile Virus
