# HP Chairman's Club App API
	Author: James Millar (james@hellopraxis.com); 
	Company: Praxis; 
	Version: v1; 
	Created: 5 May 2016; 

## Form of API

| Action			| Collection 					| Item							| Item List
|:---				|:---							|:---							|:---
| URL					| /api/{resource}				| /api/{resource}/{id} 			| /api/{resource}/{id1},{id2}
| GET				| Collection,200; Empty 404		| Object,200; Empty 404			| Collection,200; Empty 404
| POST				| Empty, 201					| Empty, 404					| Empty, 204
| PUT				| Empty, 403					| Empty, 204					| Empty, 204
| PATCH				| Empty, 403					| Empty, 204					| Empty, 204
| DELETE			| Empty, 403					| Empty, 204; Empty 404			| Empty, 204; Empty 404 


## Return Codes

	200 OK
	201 Resource Created
	204 OK, No Content
	403 Forbidden
	404	Resource Not Found
	
----------
## Resources

### Game

Resource Name: game

| Field 		| Type		| Validation			| Description
|:---			|:---		|:---					|:---
| id			| Integer	|  > 0					| Unique Identifier
| host_name		| String	| 						| Name of host for this Game
| host_mobile	| String	| Mobile Number			| Mobile of host for this Game
| start_time	| String	| ISO 8601 Date/Time	| Start date & time of Game
| finish_time	| String	| ISO 8601 Date/Time	| End date & time of Game
| invited		| Integer	| 0..8					| Number of Guests Invited
| accepted		| Integer 	| 0..8					| Number of Guests Accepted
| declined		| Integer 	| 0..8					| Number of Guests Declined
| events		| [Event]	| (See Event Object)	| Array of pre/post game events for this Game
| tickets		| [Integer]	| Unique				| Array of Tickets Numbers added to this Game
| guests		| [Integer]	| Contact ID			| Array of Guest IDs, repreenting the Contacts added as Guests to this Game
	
Note: Guests can be added to the Guest List (guests) multiple times. 
This provides a mechanism for issuing multiple tickets which they may then use to invite others.

Object: Event

| Field 		| Type		| Validation			| Description
|:---			|:---		|:---					|:---
| start_time	| String	|ISO 8601 Time			| Start time of the Event
| details		| String	|						| Description of the Event
	
#### Game Resource Example

    {
        "id": 1,
        "date": "2016-04-24T20:00:00.000Z",
        "home_team": "Sea Eagles",
        "away_team": "Knights",
        "host_name": "Reginald Smythe",
        "host_mobile": "0400 123 123",
        "invited": 4,
        "accepted": 1,
        "declined": 2,
		"events": [
            {
            	"start_time": "17:00:00",
            	"details":"Team themed cocktails at the bar"
            },
            {
            	"start_time": "19:00:00",
            	"details":"Address by the special guest "
            }
        ],
        "tickets": [12345678901234,23456789012345,12343245654321,12345643212345],
        "guests": [1,1,1,3]
    }
    
###	Contact

Resource Name: contact

| Field 		| Type		| Validation			| Description
|:---			|:---		|:---					|:---
| id			| Integer 	| > 0					| Unique Identifier
| name			| String	|						| Name of Contact
| email			| String	| Email					| Email Address of Contact
| mobile		| Integer 	| Mobile Number			| Mobile Number of Contact

#### Contact Resource Example

    {
        "id": 1,
        "name": "Paul Darrow",
        "email": "paul@liberator.com",
        "mobile": "0400 000 001"
    }

###	Guest Status

Resource Name: guest-status

| Field 		| Type		| Validation			| Description
|:---			|:---		|:---					|:---
| id			| Integer 	| > 0					| Unique Identifier
| status		| String	| (See Status Types)	| Indicates the current status of an invitation
| ticket		| Integer	| Unique				| Indicates the Ticket assigned to this Guest

#### Status Types

| Field 		| Meaning
|:---			|:---	
| {null}		| Guest has been added to the Guest List however has not been invited
| invited		| Guest has been sent an Invite but has not yet responded
| accepted		| Guest has accepted the Invite 
| declined		| Guest has declined the Invite

#### Guest Status Resource Example

    {
    	"id": 1,
    	"status": "accepted",
	    "ticket": 12345678901234
    }