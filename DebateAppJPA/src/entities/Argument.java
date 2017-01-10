package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Argument {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private Team team1;
	private Team team2;
	private int time;
	private int time1;
	private int time2;
	private int points1;
	private int points2;
	private Team winteam;
	private Team loseteam;

	public Argument(){}

	public int getId() {
        return id;
    }

	public void setId(int id) {
        this.id = id;
    }

	public Team getTeam1() {
        return team1;
    }

	public void setTeam1(Team team1) {
        this.team1 = team1;
    }

	public Team getTeam2() {
        return team2;
    }

	public void setTeam2(Team team2) {
        this.team2 = team2;
    }

	public int getTime() {
        return time;
    }

	public void setTime(int time) {
        this.time = time;
    }

	public int getTime1() {
        return time1;
    }

	public void setTime1(int time1) {
        this.time1 = time1;
    }

	public int getTime2() {
        return time2;
    }

	public void setTime2(int time2) {
        this.time2 = time2;
    }

	public int getPoints1() {
        return points1;
    }

	public void setPoints1(int points1) {
        this.points1 = points1;
    }

	public int getPoints2() {
        return points2;
    }

	public void setPoints2(int points2) {
        this.points2 = points2;
    }

	public Team getWinteam() {
		return winteam;
	}

	public void setWinteam(Team winteam) {
		this.winteam = winteam;
	}

	public Team getLoseteam() {
		return loseteam;
	}

	public void setLoseteam(Team loseteam) {
		this.loseteam = loseteam;
	}

	@Override
	public String toString() {
		return "Argument [id=" + id + ", team1=" + team1 + ", team2=" + team2 + ", time=" + time + ", time1=" + time1
				+ ", time2=" + time2 + ", points1=" + points1 + ", points2=" + points2 + ", winteam=" + winteam
				+ ", loseteam=" + loseteam + "]";
	}

}