
package Db::Db;
use strict;
use warnings;

use DBI;
use DBD::SQLite;
use Data::Dumper;

my $dbh;

my %db = ( 
    insert => sub { return 'started inserting in the database... lele male'; },
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

sub create_table_users {
    my $stmt = qq(CREATE TABLE USERS
       (ID INT PRIMARY KEY,
        USERNAME  CHAR(50) NOT NULL,
        PASSWORD  CHAR(50) NOT NULL,
        ROLE      CHAR(50) NOT NULL DEFAULT user,
        NAME CHAR(50) NOT NULL););

    my $rv = $dbh->do($stmt);
    if($rv < 0) {
       print $DBI::errstr;
    } else {
       print "Table created successfully\n";
    }
}

sub insert_into_users {
    my $stmt = qq(INSERT INTO USERS (ID, USERNAME, PASSWORD, NAME)
                   VALUES (1, 'pesho', 'pesho_pass', 'pesho peshev' ));
    my $rv = $dbh->do($stmt) or die $DBI::errstr;

    $stmt = qq(INSERT INTO USERS (ID, USERNAME, PASSWORD, NAME)
                   VALUES (2, 'kiro', 'kiro_pass', 'kiro kirov' ));
    $rv = $dbh->do($stmt) or die $DBI::errstr;

    $stmt = qq(INSERT INTO USERS (ID, USERNAME, PASSWORD, NAME)
                   VALUES (3, 'ico', 'ico_pass', 'ico icev' ));

    $rv = $dbh->do($stmt) or die $DBI::errstr;

    $stmt = qq(INSERT INTO USERS (ID, USERNAME, PASSWORD, NAME)
                   VALUES (4, 'gosho', 'gosho_pass', 'gosho goshev' ););

    $rv = $dbh->do($stmt) or die $DBI::errstr;

    print "Records created successfully\n";
}

sub print_users {
    my $stmt = qq(SELECT id, username, password, role, name from USERS;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute() or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }

    my @output = ();
    while(my @row = $sth->fetchrow_array()) {
        my $hr = {
            ID => $row[ 0 ],
            USERNAME => $row[ 1 ],
            PASSWORD => $row[ 2 ],
            ROLE => $row[ 3 ],
            NAME => $row[ 4 ],
        };
        push @output, $hr;
    }
    print "Operation done successfully\n";
    return \@output;
}

sub get_one_users {
    my $stmt = qq(SELECT id, username, password, role, name from USERS where ID = ?;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( 3 ) or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }

    my @output = ();
    while(my @row = $sth->fetchrow_array()) {
        my $hr = {
            ID => $row[ 0 ],
            USERNAME => $row[ 1 ],
            PASSWORD => $row[ 2 ],
            ROLE => $row[ 3 ],
            NAME => $row[ 4 ],
        };
        push @output, $hr;
    }
    print "Operation done successfully\n";
    return \@output;
}

sub update_users {
    my $table = 'USERS';
    my $stmt = qq(UPDATE $table set ROLE = ? where ID= ?;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( 'ADMIN', 1 ) or die $DBI::errstr;

    if( $rv < 0 ) {
       print $DBI::errstr;
    } else {
       print "Total number of rows updated : $rv\n";
    }
}

sub delete_from_users {
    my $id = shift;
    my $table = 'USERS';
    my $stmt = qq(DELETE FROM $table where ID= ?;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( $id ) or die $DBI::errstr;

    if( $rv < 0 ) {
       print $DBI::errstr;
    } else {
       print "Rows deleted : $rv\n";
    }
}

1;
 

