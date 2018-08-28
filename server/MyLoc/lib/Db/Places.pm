package Db::Places;
use strict;
use warnings;

use DBI;
use DBD::SQLite;
use Data::Dumper;
use JSON;

my $dbh;

my %db = ( 
    insert => sub { return 'started inserting in the database...'; },
);
 
sub get_db {
    connect_db();
    return \%db;
}

sub connect_db {
    unless ( $dbh ) {
        my $driver   = "SQLite";
        my $database = "lib/Db/test.db";
        my $dsn = "DBI:$driver:dbname=$database";
        my $userid = "";
        my $password = "";
        $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 })
           or die $DBI::errstr;
        print "Opened database successfully1\n";
    }
}


sub fetch_places {
    my $stmt = qq(SELECT id, category, city, address, public, tovisit, latlng, notes, pic, userid from PLACES;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute() or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }

    my %output;
    while(my @row = $sth->fetchrow_array()) {
        my $hr = {
            ID => $row[ 0 ],
            CATEGORY => $row[ 1 ],
            CITY => $row[ 2 ],
            ADDRESS => $row[ 3 ],
            PUBLIC => $row[ 4 ],
            TOVISIT => $row[ 5 ],
            LATLNG => $row[ 6 ],
            NOTES => $row[ 7 ],
            PIC => $row[ 8 ],
            USERID => $row[ 9 ],
        };
        $output{ $hr->{ 'ID' } } = $hr;
    }
    print "Operation done successfully\n";
    return \%output;
}

1;
