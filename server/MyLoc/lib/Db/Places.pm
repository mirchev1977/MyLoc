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

sub get_next_id {
    my $table = shift;
    my $stmt = qq(SELECT id from $table order by id desc limit 1;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute() or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }

    my $nxt_id;
    while(my @row = $sth->fetchrow_array()) {
        $nxt_id = $row[ 0 ];
    }
    $nxt_id++;
    print "Operation done successfully\n";
    return $nxt_id;
}

sub insert_one_place {
    my ($id, $cat, $city, $addr, $publ, $tovis, 
        $latlng, $not, $pic, $uid) = @_;
    my $fields = "(ID, CATEGORY, CITY, ADDRESS, PUBLIC, TOVISIT, LATLNG, NOTES, PIC, USERID)";
    my $values = "( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";



    my $stmt = qq(INSERT INTO PLACES $fields
                   VALUES $values);
    my $sth = $dbh->prepare( $stmt );
    my $rv;

    $rv = $sth->execute( $id, $cat, $city, $addr, 
        $publ, $tovis, $latlng, $not, $pic, $uid) 
        or die $DBI::errstr;

    return 1;
}

sub delete_from_places {
    my $table = shift;
    my $id = shift;
    my $stmt = qq(DELETE FROM $table where ID= ?;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( $id ) or die $DBI::errstr;

    if( $rv < 0 ) {
       print $DBI::errstr;
    } else {
       print "Rows deleted : $rv\n";
    }
}

sub update_places {
    my $places= shift;

    my $table = 'PLACES';
    eval {
        for my $key ( keys %$places ) {
            my $p = $places->{ $key };

            my $stmt = qq(UPDATE $table set CATEGORY = ?, CITY = ?, ADDRESS = ?, PUBLIC = ?, TOVISIT = ?, LATLNG = ?, NOTES = ?, PIC = ?, USERID = ? where ID= ?;);

            my $sth = $dbh->prepare( $stmt );

            my $rv = $sth->execute( 
                $p->{ 'CATEGORY' }, $p->{ 'CITY' },
                $p->{ 'ADDRESS' }, $p->{ 'PUBLIC' }, 
                $p->{ 'TOVISIT' }, $p->{ 'LATLNG' }, 
                $p->{ 'NOTES' }, $p->{ 'PIC' }, $p->{ 'USERID' },
                $p->{ 'ID' }
            ) 
                or die $DBI::errstr;
        }
    };

    if ( $@ ) {
        `echo error: $@ >> miro_log`;
    }
}

1;
