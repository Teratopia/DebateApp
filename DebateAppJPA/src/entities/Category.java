package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@OneToMany(mappedBy = "category")
	private List<Topic> topics;

	public Category() {
	}

	public void addTopic(Topic topic) {
		if (topics == null) {
			topics = new ArrayList<>();
		}
		if (!topics.contains(topic)) {
			topics.add(topic);
			if (topic.getCategory() != null) {
				topic.getCategory().getTopics().remove(topic);
			}
			topic.setCategory(this);
		}
	}

	public void removeTopic(Topic topic) {
		topic.setCategory(null);
		if (topics != null) {
			topics.remove(topic);
		}
	}

	public List<Topic> getTopics() {
		return topics;
	}

	public void setTopics(List<Topic> topics) {
		this.topics = topics;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
	}

}
