
const pg = require('pg');
//this is after 'npm init' and 'npm i pg'

const configs = {
user: 'postgres',
password: 'postgres',
host: '127.0.0.1',
database: 'n64',
port: 5432,
};

// sudo -u postgres createdb todolist
// psql -d todolist -U postgres -f tables.sql;

const client = new pg.Client(configs);

const show = text => {
	client.query(text,(err, res) => {
		if( err ){
     	console.log( "error", err.message );
    	} else {
			// console.log("result: ", res.rows); 
			for(let i=0; i<res.rows.length; i++) {
				console.log(res.rows[i]);
			}
		};
	})
}


client.connect((err) => {

	console.log("Starting PSQL");
 
	if (process.argv[2] == "") {
		process.argv[2] = "undefined";
	}

	let command = (process.argv[2]).toUpperCase();
	let task = process.argv[3];
	let update = process.argv[4];
	let fifth = process.argv[5];
	let sixth = process.argv[6];

	let text = "";

	switch (command) {


		case 'SHOWALL':
		    text = "SELECT * FROM games;";
		    console.log('All games as follows:');
		    break;

		case 'SHOWALLTITLE':
		    text = "SELECT title FROM games;";
		    console.log('All game titles as follows:');
		    break;

		case 'SHOWALLYEAR':
		    text = "SELECT DISTINCT year FROM games;";
		    console.log('All years as follows:');
		    break;

		case 'SHOWTEAMGAMES':
		    text = `SELECT title FROM games WHERE developers = '${task}';`;
		    console.log(`All games from ${task} as follows:`);
		    break;

		case 'BEFORE':
		    text = `SELECT * FROM games WHERE year < '${task}';`;
		    console.log(`All games before '${task}' follows:`);
		    break;

		case 'AVERAGE':
		    text = `SELECT AVG(${task}) FROM games;`;
		    console.log(`Average ${task} as follows:`);
		    break;

		case 'DESC':
		    text = `SELECT DISTINCT ${task} FROM games ORDER BY ${task} DESC;`;
		    console.log(`All ${task} as follows:`);
		    break;

		case 'ASC':
		    text = `SELECT DISTINCT ${task} FROM games ORDER BY ${task} ASC;`;
		    console.log(`All ${task} as follows:`);
		    break;

		case 'SHOWTEAMNOT':
		    text = `SELECT * FROM games WHERE NOT developers = '${task}';`;
		    // text = `SELECT * FROM games WHERE developers <> '${task}';`;
		    console.log(`All games not from ${task} as follows:`);
		    break;

		case 'ADDGAME':
		//  node index.js addgame "'F-Zero-X', '1998', 'Nintendo EAD', 'Racing'"
		    text = `INSERT INTO games (title, year, developers, genre) VALUES (${task}) RETURNING *;`;
		    console.log(`New game as follows:`);
		    break;

		case 'GAMEDESCYEAR':
		    text = `SELECT title, year FROM games ORDER BY year DESC;`;
		    console.log(`Games as follows:`);
		    break;

		case 'DELETEGAMES':
		    text = `DELETE FROM games WHERE NOT developers ='${task}' RETURNING *;`;
		    console.log(`Deleted games as follows:`);
		    break;

		case 'AVERAGEYEAR':
		    text = `SELECT AVG(year) FROM games WHERE developers ='${task}' OR title = '${update}';`;
		    console.log(`GAMES from ${task} or title is '${update}' as follows:`);
		    break;

		case 'FINAL':
		    text = `SELECT id, title, genre FROM games WHERE year < '${task}' OR developers ='${update}' OR (genre = '${fifth}' AND developers = '${sixth}');`;
		    console.log(`GAMES from ${task} or developer is '${update}' or  (genre = '${fifth}' AND developers = '${sixth}') as follows:`);
		    break;

		default:
			text = "SELECT * FROM games";
		    console.log(`Default`);
		}
	show(text);
});

