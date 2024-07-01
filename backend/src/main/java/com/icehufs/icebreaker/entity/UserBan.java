package com.icehufs.icebreaker.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "userban")
public class UserBan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "ban_duration")
    private BanDurationEnum banDuration;

    @Column(name = "ban_starttime")
    private LocalDateTime banStartTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "ban_reason")
    private BanReasonEnum banReason;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_user_email"))
    private User user;

    public UserBan(String email, BanDurationEnum banDuration, BanReasonEnum banReason) {
        this.email = email;
        this.banDuration = banDuration;
        this.banStartTime = LocalDateTime.now();
        this.banReason = banReason;
    }
}
