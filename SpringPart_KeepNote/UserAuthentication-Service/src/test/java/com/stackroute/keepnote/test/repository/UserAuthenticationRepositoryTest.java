package com.stackroute.keepnote.test.repository;

import java.util.Date;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserAutheticationRepository;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)


public class UserAuthenticationRepositoryTest {

    @Autowired
    private UserAutheticationRepository autheticationRepository;

    private User user;


    @Before
    public void setUp() throws Exception {
        user = new User();
        user.setUserId("Jhon123");
        user.setFirstName("Jhon123");
        user.setLastName("Smith");
        user.setUserRole("Admin");
        user.setUserPassword("123456");
        user.setUserAddedDate(new Date());
    }

    @After
    public void tearDown() throws Exception {
        autheticationRepository.deleteAll();
    }

    @Test
    public void testRegisterUserSuccess() {
        autheticationRepository.save(user);
        User object = autheticationRepository.findById(user.getUserId()).get();
        Assert.assertEquals(user.getUserId(), object.getUserId());
    }

    @Test
    public void testLoginUserSuccess() {
        autheticationRepository.save(user);
        User object = autheticationRepository.findById(user.getUserId()).get();
        Assert.assertEquals(user.getUserId(), object.getUserId());
    }
}
