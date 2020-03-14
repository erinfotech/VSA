package mk.ukim.finki.vsa.model;

import lombok.Getter;
import lombok.Setter;
import mk.ukim.finki.vsa.model.base.BaseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.List;
import java.util.Random;

/**
 * @author Konstantin Bogdanoski (konstantin.b@live.com)
 */
@Entity
@Getter
@Setter
@Table(name = "vsa_video")
public class Video extends BaseEntity {
    private String key;
    private String name;
    @Lob
    @Column(name = "img_link", length = 1000)
    private String imgLink;
    private String fileName;
    @Lob
    @Column(name = "description", length = 2000)
    private String description;

    private boolean HQ;

    private boolean LQ;

    private boolean MQ;

    public void setKey() {
        this.key = generateKey();
    }

    /**
     * Function used to generate a key for each video
     */
    private String generateKey() {
        Random r = new Random();
        StringBuilder sb = new StringBuilder();
        while (sb.length() < 15) {
            sb.append(Integer.toHexString(r.nextInt()));
        }
        return sb.toString().substring(0, 15);
    }
}