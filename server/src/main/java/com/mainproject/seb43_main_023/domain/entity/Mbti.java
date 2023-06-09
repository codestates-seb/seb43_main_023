package com.mainproject.seb43_main_023.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Mbti {
    @Id
    private String mbti;
    private String img;
    private String place;
    private String description1;
    @Column(length = 3000,nullable = false)
    private String description2;
    @Column(length = 3000,nullable = false)
    private String placeImg;
}
