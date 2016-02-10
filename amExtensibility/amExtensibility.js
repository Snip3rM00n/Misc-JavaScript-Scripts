/*
	Anthony McKeever's JavaScript Extensibility Library
	File: amExtensibility.js
	Version: 1.00a
	Langauge: JavaScript (NodeJS v4.2.3)

	Description:
		Adds a little C# to Javascript by extending various object types with a series of prototypes.

	Use:
		Simply require the amExtensibility file into your code.

	Usage Example:
		require('./amExtensibility.js');

		var myArray = ['stuff', 'in', 'a', 'box'];
		if(myArray.contains('stuff'))
		{
			var myString = "Current Date/Time Stamp: {0}";
			console.log(myString.overload(new Date().getNow()));
		}
*/

/*	*****	DATE PROTOTYPES		****************************************************************************************
	Date.today		- Gets today's date
	Date.timeNow 	- Gets the current time
	Date.getNow 	- Gets the current time/date stamp.
*/

Date.prototype.today = function ()
{ 
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function ()
{
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

Date.prototype.getNow = function()
{
	return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear() + " " + ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}


/*	*****	STRING PROTOTYPES	***************************************************************************************
	string.overload 	- Adds C# style overloading to strings
		Example: "This is {0} {1} string".overload("my", "overloaded");

	string.extTrimLeft	- Trims the given characters off of the left of the string
	string.extTrimRight	- Trims the given characters off of the right of the string
	string.extTrim 		- Trims the given characters off of the both sides of the string
	string.getHashCode	- Gets an Integer hash of a string.
*/

String.prototype.overload = function()
{
	var newString = this;

	for(var i = 0, l = arguments.length; i < l; i++)
	{
		newString = newString.replace(new RegExp("\\{" + i.toString() + "\\}", "g"), arguments[i], "g");
	}

	return newString;
}

String.prototype.extTrimLeft = function(charlist)
{
	if(charlist === undefined)
		charlist = "\s";

	return this.replace(new RegExp("^[" + charlist + "]+"), "");
}

String.prototype.extTrimRight = function(charlist)
{
	if (charlist === undefined)	
		charlist = "\s";

	return this.replace(new RegExp("[" + charlist + "]+$"), "");
}

String.prototype.extTrim = function(charlist)
{
	return this.extTrimLeft(charlist).extTrimRight(charlist);
}

String.prototype.getHashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
  return hash;
};

String.prototype.getAbsHashCode = function()
{
	return Math.abs(this.getHashCode());
}


/*	*****	ARRAY PROTOTYPES	***************************************************************************************
	Array.contains		- checks if the array contains a specific value or object.
	Array.shuffle		- randomly shuffles the objects of an array.
*/
Array.prototype.contains = function(item)
{
	for(var i in this)
	{
		if (this[i] == item)
			return true;
	}

	return false;
}

Array.prototype.shuffle = function()
{
	var counter = this.length;
	while(counter > 0)
	{
		var index = Math.floor(Math.random() * counter);

		counter--;

		var tmp = this[counter];
		this[counter] = this[index];
		this[index] = tmp;
	}

	return this;
}