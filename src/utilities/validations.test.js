import {emailValidation, textValidation, passwordValidation} from './validations'

describe("Utilities", () => {
	test("Email Validation", () => {
        let result = emailValidation('test@test.com');
        expect(result).toBeNull();

        result = emailValidation('test@test.cl');
        expect(result).toBeNull();

        result = emailValidation('test@test.com.cl');
        expect(result).toBeNull();

        result = emailValidation('name.test@test.com');
        expect(result).toBeNull();   
        
        result = emailValidation('name-test@test.com');
        expect(result).toBeNull();     

        result = emailValidation('testtest.cl');
        expect(result).not.toBeNull();

        result = emailValidation('test@@test.cl');
        expect(result).not.toBeNull();

        result = emailValidation('@test.cl');
        expect(result).not.toBeNull();

        result = emailValidation('test@.cl');
        expect(result).not.toBeNull();

        result = emailValidation('test@test');
        expect(result).not.toBeNull();

        result = emailValidation('test@test.');
        expect(result).not.toBeNull();

        result = emailValidation('testtest');
        expect(result).not.toBeNull();

        result = emailValidation('');
        expect(result).not.toBeNull();

        result = emailValidation('Joe Smith <email@example.com>');
        expect(result).not.toBeNull();
 
        result = emailValidation('email.example.com');
        expect(result).not.toBeNull();
        
        result = emailValidation('email@example@example.com');
        expect(result).not.toBeNull();

        result = emailValidation('.email@example.com');
        expect(result).not.toBeNull();

        result = emailValidation('email.@example.com');
        expect(result).not.toBeNull();

        result = emailValidation('email..email@example.com');
        expect(result).not.toBeNull();

        result = emailValidation('email@example..com');
        expect(result).not.toBeNull();

        result = emailValidation('just”not”right@example.com');
        expect(result).not.toBeNull();
 
        result = emailValidation('email@example..com');
        expect(result).not.toBeNull();

        result = emailValidation('Abc..123@example.com');
        expect(result).not.toBeNull();       
        
        result = emailValidation('email@-example.com');
        expect(result).not.toBeNull();  

        result = emailValidation('email@example.com (Joe Smith)');
        expect(result).not.toBeNull();  

        result = emailValidation('#@%^%#$@#$@#.com');
        expect(result).not.toBeNull();  
    });

    test("Password Validation", () => {
        let result = passwordValidation('HHHHHHHHHxH');
        expect(result).toBeNull();    

        result = passwordValidation('hhhhhhhhhXh');
        expect(result).toBeNull();  
        
        result = passwordValidation('33333333Hx33');
        expect(result).toBeNull();       
        
        result = passwordValidation('HHxx');
        expect(result).not.toBeNull();      
        
        result = passwordValidation('3333');
        expect(result).not.toBeNull();   

        result = passwordValidation('FFFFFFFFFF');
        expect(result).not.toBeNull();   
        
        result = passwordValidation('ffffffffff');
        expect(result).not.toBeNull();  
        
        result = passwordValidation('444444444444');
        expect(result).not.toBeNull();    
        
        result = passwordValidation('');
        expect(result).not.toBeNull(); 
    });

    test("Text Validation", () => {
        let result = textValidation(5,'FFFFFFFF');
        expect(result).toBeNull();    
        
        result = textValidation(5,'gggggggg');
        expect(result).toBeNull();    

        result = textValidation(5,'000000000');
        expect(result).toBeNull(); 

        result = textValidation(5,'fds');
        expect(result).not.toBeNull();

        result = textValidation(5,'');
        expect(result).not.toBeNull();
    });    


});
