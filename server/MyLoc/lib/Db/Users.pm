package Db::Users;
use strict;
use warnings;

use DBI;
use DBD::SQLite;
use Data::Dumper;
use JSON;

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
        ROLE      CHAR(50) NOT NULL DEFAULT USER,
        NAME CHAR(50) NOT NULL););

    my $rv = $dbh->do($stmt);
    if($rv < 0) {
       print $DBI::errstr;
    } else {
       print "Table created successfully\n";
    }
}

sub create_table_logged_in {
    my $stmt = qq(CREATE TABLE LOGGEDIN
       (TOKEN CHAR(100) PRIMARY KEY,
        ID        INT,
        USERNAME  CHAR(50),
        PASSWORD  CHAR(50),
        ROLE      CHAR(50),
        NAME      CHAR(50)););

    my $rv = $dbh->do($stmt);
    if($rv < 0) {
       print $DBI::errstr;
    } else {
       print "Table loggedin created successfully\n";
    }
}

sub insert_into_loggedin {
    print "dump it: " . Dumper( \@_ );
    my ( $token, $id, $username, $password, $role, $name ) = @_;
    my $stmt = qq(INSERT INTO LOGGEDIN (TOKEN, ID, USERNAME, PASSWORD, ROLE, NAME)
                   VALUES ( ?, ?, ?, ?, ?, ? ));
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( $token, $id, $username, $password, $role, $name ) or die $DBI::errstr;

    print "Records wrote into loggedin successfully\n";
}

sub insert_one_user {
    my ( $username, $password, $name, $role ) = @_;
    my $id = get_next_id( 'USERS' );
    my $fields;
    my $values;
    if ( $role ) {
        $fields = "(ID, USERNAME, PASSWORD, NAME, ROLE)";
        $values = "( ?, ?, ?, ?, ?)";
    } else {
        $fields = "(ID, USERNAME, PASSWORD, NAME)";
        $values = "( ?, ?, ?, ?)";
    }
    my $stmt = qq(INSERT INTO USERS $fields
                   VALUES $values);
    my $sth = $dbh->prepare( $stmt );
    my $rv;

    if ( $role ) {
        $rv = $sth->execute($id, $username, $password, $name, $role ) or die $DBI::errstr;
    } else {
        $rv = $sth->execute($id, $username, $password, $name ) or die $DBI::errstr;
    }

    my $created = {
        ID       => $id,
        USERNAME => $username,
        NAME     => $name, 
        PASSWORD => $password,
    };

    return $created;
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

sub fetch_users {
    my $stmt = qq(SELECT id, username, password, role, name from USERS;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute() or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }

    my %output;
    while(my @row = $sth->fetchrow_array()) {
        my $hr = {
            ID => $row[ 0 ],
            USERNAME => $row[ 1 ],
            PASSWORD => $row[ 2 ],
            ROLE => $row[ 3 ],
            NAME => $row[ 4 ],
        };
        $output{ $hr->{ 'ID' } } = $hr;
    }
    print "Operation done successfully\n";
    return \%output;
}

sub get_one_users {
    my $id = shift;
    my $username = shift;
    my $password = shift;

    my $stmt;
    if ( $id ) {
        $stmt = qq(SELECT id, username, password, role, name from USERS where ID = ?;);
    } else {
        $stmt = qq(SELECT id, username, password, role, name from USERS where USERNAME = ? AND PASSWORD = ?;);
    }

    my $sth = $dbh->prepare( $stmt );

    my $rv;
    if ( $id ) {
        $rv = $sth->execute( $id ) or die $DBI::errstr;
    } else {
        $rv = $sth->execute( $username, $password ) or die $DBI::errstr;
    }

    if($rv < 0) {
       print $DBI::errstr;
    }

    my %output;
    while(my @row = $sth->fetchrow_array()) {
        my $hr = {
            ID => $row[ 0 ],
            USERNAME => $row[ 1 ],
            PASSWORD => $row[ 2 ],
            ROLE => $row[ 3 ],
            NAME => $row[ 4 ],
        };
        $output{ $hr->{ 'ID' } } = $hr;
    }
    print "Operation done successfully\n";
    return \%output;
}

sub update_users {
    my $users_json = shift;
    my $users =  decode_json( $users_json );

    my $table = 'USERS';
    eval {
        for my $key ( keys %$users ) {
            my $user = $users->{ $key };

            if ( $user->{ 'ID' } eq 'NEW' ) {
                $user->{ 'ID' } = get_next_id( $table );
                my $uid = $user->{ 'ID' };
                insert_one_user( $user->{ 'USERNAME' }, $user->{ 'PASSWORD' }, $user->{ 'NAME' }, $user->{ 'ROLE' } );
                next;
            }

            my $stmt = qq(UPDATE $table set USERNAME = ?, PASSWORD = ?, NAME = ?, ROLE = ? where ID= ?;);
            my $sth = $dbh->prepare( $stmt );

            my $rv = $sth->execute( $user->{ 'USERNAME' }, $user->{ 'PASSWORD' }, $user->{ 'NAME' }, $user->{ 'ROLE' }, $user->{ 'ID' } ) 
                or die $DBI::errstr;
        }
    };

    if ( $@ ) {
        `echo error: $@ >> miro_log`;
    }
}

sub delete_from_users {
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

sub delete_users {
    my $table = shift;
    my $users_json = shift;
    my $users =  decode_json( $users_json );

    eval {
        for my $key ( keys %$users ) {
            my $user = $users->{ $key };

            my $stmt = qq(DELETE FROM $table  where ID= ?;);
            my $sth = $dbh->prepare( $stmt );

            my $rv = $sth->execute( $user->{ 'ID' } ) 
                or die $DBI::errstr;
        }
    };

    if ( $@ ) {
        `echo error: $@ >> miro_log`;
    }
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

sub get_loggedin {
    my $user = shift;
    $user =  decode_json( $user );

    my $id = shift;
    my $stmt = qq(SELECT token, id, username, password, role, name from loggedin WHERE TOKEN = ?;);
    my $sth = $dbh->prepare( $stmt );
    my $rv = $sth->execute( $user->{ 'TOKEN' } ) or die $DBI::errstr;

    if($rv < 0) {
       print $DBI::errstr;
    }
    my @row = $sth->fetchrow_array();
    my $out_hr = {
        TOKEN    => $row[ 0 ],
        ID       => $row[ 1 ],
        USERNAME => $row[ 2 ],
        PASSWORD => $row[ 3 ],
        ROLE     => $row[ 4 ],
        NAME     => $row[ 5 ],
    };

    my $loggedin = 1;
    for my $key ( keys %$user ) {
        if ( $user->{ $key } ne $out_hr->{ $key } ) {
            $loggedin = 0;
            last;
        }
    }

    print "Operation done successfully\n";
    return $loggedin;
}

sub user_login {
    my $user = shift;
    $user =  decode_json( $user );

    $user =  get_one_users( '', $user->{ 'USERNAME' }, $user->{ 'PASSWORD' } );

    for ( keys %$user ) {
        $user = $user->{ $_ };
    }

    return $user;
}

sub logout {
    my $token = shift;
    my $stmt = qq( DELETE FROM LOGGEDIN WHERE token = ?  ); 
    my $sth  = $dbh->prepare( $stmt );
    my $rv   = $sth->execute( $token );
}

1;
 

