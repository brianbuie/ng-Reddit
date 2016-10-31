(function() {
    'use strict'

    angular
        .module('app')
        .filter('nbaflair', nbaflair)

    function nbaflair() {

    	// converts various r/nba flairs to team's 3 letter abbreviation

    	return function(author_flair_css_class){
            var flair = author_flair_css_class
            if(!flair) return

            // all teams and valid reddit flair aliases
            var teams = {
                'ATL' : ['ATL', 'Hawks'],
                'BKN' : ['BKN', 'Nets'],
                'BOS' : ['BOS', 'Celtics'],
                'CHA' : ['CHA', 'Hornets', 'Bobcats'],
                'CHI' : ['CHI', 'Bulls'],
                'CLE' : ['CLE', 'Cavaliers'],
                'DAL' : ['DAL', 'Mavericks', 'Mavs'],
                'DEN' : ['DEN', 'Nuggets'],
                'DET' : ['DET', 'Pistons'],
                'GSW' : ['GSW', 'Warriors'],
                'HOU' : ['HOU', 'Rockets'],
                'IND' : ['IND', 'Pacers'],
                'LAC' : ['LAC', 'Clippers'],
                'LAL' : ['LAL', 'Lakers'],
                'MEM' : ['MEM', 'Grizzlies'],
                'MIA' : ['MIA', 'Heat'],
                'MIL' : ['MIL', 'Bucks'],
                'MIN' : ['MIN', 'Timberwolves'],
                'NOP' : ['NOP', 'Pelicans'],
                'NYK' : ['NYK', 'Knicks', 'KnickerBockers'],
                'OKC' : ['OKC', 'Thunder'],
                'ORL' : ['ORL', 'Magic'],
                'PHI' : ['PHI', '76ers'],
                'PHX' : ['PHX', 'Suns'],
                'POR' : ['POR', 'Trailblazers'],
                'SAC' : ['SAC', 'Kings'],
                'SAS' : ['SAS', 'Spurs'],
                'TOR' : ['TOR', 'Raptors'],
                'UTA' : ['UTA', 'Jazz'],
                'WSH' : ['WSH', 'Wizards', 'Bullets']
            }
            for(var team in teams){
                for(var aliasKey in teams[team]){
                    var alias = teams[team][aliasKey]
                    // if the alias is found within the flair
                    // set the flair to the team abbreviation that alias belongs to
                    if( flair.toLowerCase().indexOf(alias.toLowerCase()) > -1 ){
                        flair = team
                    }
                }
            }
            return flair
        }
    }
})()