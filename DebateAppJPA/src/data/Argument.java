package data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Argument {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
}
