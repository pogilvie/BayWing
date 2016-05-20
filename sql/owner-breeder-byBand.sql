select Hawks.bandNumber, Owner.lastName, Breeder.lastName
  from Hawks, Contacts as Owner, Contacts as Breeder
 where Hawks.breeder = Breeder.rowid and Hawks.owner = Owner.rowid
limit 10 offset 200;
