const eventSchema =
  `CREATE TABLE statsbomb.event3 (
    event_id SERIAL PRIMARY KEY,
    sbd_uuid text,
    match_id integer NOT NULL REFERENCES statsbomb.match(match_id) ON DELETE CASCADE,
    period_id smallint REFERENCES statsbomb.period(period_id),
    team_id integer REFERENCES statsbomb.team(team_id),
    player_id integer REFERENCES statsbomb.player(player_id),
    formation_position_id integer REFERENCES statsbomb.formation_position(formation_position_id),
    event_timestamp timestamp without time zone,
    event_minute smallint NOT NULL,
    event_second smallint NOT NULL,
    event_duration real,
    event_match_index smallint NOT NULL,
    event_team_index integer,
    event_type event_type NOT NULL,
    event_outcome boolean NOT NULL DEFAULT false,
    event_x real,
    event_y real,
    event_z real,
    team_score integer NOT NULL DEFAULT 0,
    opposition_score integer NOT NULL DEFAULT 0,
    qualifiers jsonb DEFAULT '{}'::jsonb,
    extras jsonb DEFAULT '{}'::jsonb,
    competition_id integer,
    season_id integer
);`;

const eventTypeSchema = 
`CREATE TYPE statsbomb."event_type" AS ENUM (
	'pass',
	'offside_pass',
	'take_on',
	'foul',
	'out',
	'corner_awarded',
	'tackle',
	'interception',
	'turnover',
	'save',
	'claim',
	'clearance',
	'miss',
	'post',
	'attempt_saved',
	'goal',
	'card',
	'player_off',
	'player_on',
	'player_retired',
	'player_returns',
	'player_becomes_goalkeeper',
	'goalkeeper_becomes_player',
	'condition_change',
	'official_change',
	'start_delay',
	'end_delay',
	'end',
	'start',
	'team_set_up',
	'player_changed_position',
	'player_changed_jersey_number',
	'collection_end',
	'temp_goal',
	'temp_attempt',
	'formation_change',
	'punch',
	'good_skill',
	'deleted_event',
	'aerial',
	'challenge',
	'rescinded_card',
	'ball_recovery',
	'dispossessed',
	'error',
	'keeper_pick_up',
	'cross_not_claimed',
	'smother',
	'offside_provoked',
	'shield_ball_opp',
	'foul_throw_in',
	'penalty_faced',
	'keeper_sweeper',
	'chance_missed',
	'ball_touch',
	'temp_save',
	'resume',
	'contentious_referee_decision',
	'possession_data',
	'fifty_fifty',
	'referee_drop_ball',
	'failed_to_block',
	'injury_time_announcement',
	'coach_setup',
	'caught_offside',
	'other_ball_contact',
	'blocked_pass',
	'delayed_start',
	'early_end',
	'player_off_pitch',
	'shot_faced',
	'camera_on',
	'camera_off',
	'pressure',
	'own_goal_for',
	'ball_receipt',
	'unknown',
	'blocked_shot',
	'attempt_blocked',
	'attempt_saved_to_post',
	'attempt_saved_off_target',
	'carry');`

const competitionSchema = `CREATE TABLE competition (
	competition_id serial4 NOT NULL,
	competition_opta_id int4 NULL,
	competition_name text NOT NULL,
	competition_type_id int4 NOT NULL DEFAULT 1,
	country_id int4 NULL,
	competition_score_type_id int4 NOT NULL DEFAULT 1,
	tiebreaker_ruleset text NULL,
	competition_pyramid_id int4 NULL,
	competition_pyramid_rank int4 NOT NULL DEFAULT 1,
	data_provider_id int4 NOT NULL DEFAULT 1,
	competition_female bool NOT NULL DEFAULT false,
	competition_group_id int4 NOT NULL DEFAULT 6,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	is_deleted bool NULL DEFAULT false,
	CONSTRAINT competition_competition_opta_id_key UNIQUE (competition_opta_id),
	CONSTRAINT competition_pkey PRIMARY KEY (competition_id)
);`

const countrySchema = `CREATE TABLE country (
	country_id serial4 NOT NULL,
	country_opta_id int2 NULL,
	country_name text NOT NULL,
	country_code text NULL,
	region_id int4 NULL,
	country_adjective text NULL,
	CONSTRAINT country_country_code_key UNIQUE (country_code),
	CONSTRAINT country_country_name_key UNIQUE (country_name),
	CONSTRAINT country_pkey PRIMARY KEY (country_id)
);`

const seasonSchema = `CREATE TABLE season (
	season_id serial4 NOT NULL,
	season_opta_id int2 NULL,
	season_name text NOT NULL,
	CONSTRAINT season_pkey PRIMARY KEY (season_id),
	CONSTRAINT season_season_opta_id_key UNIQUE (season_opta_id)
);`

const playerSchema = `CREATE TABLE player (
        player_id serial4 NOT NULL,
        player_opta_id int4 NULL,
        player_name text NOT NULL,
        player_first_name text NULL,
        player_last_name text NULL,
        player_known_name text NULL,
        player_weight int2 NULL,
        player_height int2 NULL,
        player_birth_date date NULL,
        player_preferred_foot text NULL,
        country_id int4 NULL,
        player_female bool NOT NULL DEFAULT false,
        CONSTRAINT player_pkey PRIMARY KEY (player_id),
        CONSTRAINT player_player_opta_id_key UNIQUE (player_opta_id)
    );`

const teamSchema = `CREATE TABLE team (
	team_id serial4 NOT NULL,
	team_opta_id int2 NULL,
	team_name text NOT NULL,
	team_short_name text NULL,
	team_founded int2 NULL,
	team_first_color text NULL,
	team_second_color text NULL,
	team_female bool NOT NULL DEFAULT false,
	country_id int4 NULL,
	CONSTRAINT team_pkey PRIMARY KEY (team_id),
	CONSTRAINT team_team_opta_id_key UNIQUE (team_opta_id)
);`

const matchSchema = `CREATE TABLE "match" (
	match_id serial4 NOT NULL,
	match_opta_id int4 NULL,
	match_date timestamptz NOT NULL,
	match_home_team_id int4 NOT NULL,
	match_away_team_id int4 NOT NULL,
	match_type text NOT NULL,
	match_weather text NULL,
	match_attendance int4 NULL,
	match_home_score int2 NULL,
	match_away_score int2 NULL,
	match_round_number int2 NULL,
	match_round_type text NULL,
	match_group_name text NULL,
	match_leg text NULL,
	match_first_leg_id int4 NULL,
	match_next_match_id int4 NULL,
	competition_id int2 NULL,
	season_id int4 NULL,
	venue_id int4 NULL,
	match_neutral_ground bool NOT NULL DEFAULT false,
	match_home_manager_id int4 NULL,
	match_away_manager_id int4 NULL,
	match_ws_id int4 NULL,
	match_events_imported timestamptz NULL,
	match_sbdata_id int4 NULL,
	match_week int4 NULL,
	match_home_team_group text NULL,
	match_away_team_group text NULL,
	match_home_penalty_score int2 NULL,
	match_away_penalty_score int2 NULL,
	"match_play_status" statsbomb."match_play_status" NULL,
	match_events_import_started timestamptz NULL,
	match_events_import_failed timestamptz NULL,
	match_360_imported timestamptz NULL,
	CONSTRAINT match_match_first_leg_id_key UNIQUE (match_first_leg_id),
	CONSTRAINT match_match_opta_id_key UNIQUE (match_opta_id),
	CONSTRAINT match_match_sbdata_id_key UNIQUE (match_sbdata_id),
	CONSTRAINT match_match_ws_id_key UNIQUE (match_ws_id),
	CONSTRAINT match_pkey PRIMARY KEY (match_id)
);`

module.exports = { eventSchema, eventTypeSchema, competitionSchema, countrySchema, seasonSchema, playerSchema, teamSchema, matchSchema };