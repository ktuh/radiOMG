### SETUP ###

The current version of RadiOMG is designed exclusively for KTUH FM. As such, various features are hard-coded to work with KTUH resources of various kinds, including images, copy, site structure, links. In other words, the software is coupled to the station for which it was designed. If you're interested in using this platform for your own organization, please contact us. 

Because we are designing this software just with KTUH in mind for now, some features are less robust than they would be if we were aiming for wider use. The system does not yet support shows that begin and end on different days (ie. ones on air over midnight). KTUH shows are in three-hour blocks, eight per day. For shows that end at the top of the hour, please specify in the program that they end one minute before then.

### BUILD ###

Build with the following command:
`meteor build --server=https://{url}:443 --server-only`
