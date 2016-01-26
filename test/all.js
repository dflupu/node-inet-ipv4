var expect = require('chai').expect;
var inet_ipv4 = require('../index.js');

describe('inet_ipv4', function() {

    describe('#aton()', function() {

        it('should return correct values for valid inputs', function() {
            expect(inet_ipv4.aton('0.0.0.10')).equal(10);
            expect(inet_ipv4.aton('212.146.69.207')).equal(3566355919);
            expect(inet_ipv4.aton('255.255.255.255')).equal(4294967295);
        });

        it('should return null for bad inputs', function() {
            expect(inet_ipv4.aton('1.')).be.null;
            expect(inet_ipv4.aton('.1')).be.null;
            expect(inet_ipv4.aton('256.1')).be.null;
        });

        it('should work on ips with only 3 parts', function() {
            expect(inet_ipv4.aton('255.255.0x0001')).equal(4294901761);
        });

        it('should work on ips with only 2 parts', function() {
            expect(inet_ipv4.aton('255.0x00000001')).equal(4278190081);
        });

        it('should work on ips with only 1 part', function() {
            expect(inet_ipv4.aton('3566355934')).equal(3566355934);
        });
    });

    describe('#ntoa()', function() {

        it('should return correct values for valid inputs', function() {
            expect(inet_ipv4.ntoa(4294967295)).equal('255.255.255.255');
            expect(inet_ipv4.ntoa(3566355919)).equal('212.146.69.207');
            expect(inet_ipv4.ntoa(0)).equal('0.0.0.0');
        });

        it('should return null for invalid inputs', function() {
            expect(inet_ipv4.ntoa(9994967295)).to.be.null;
            expect(inet_ipv4.ntoa(-50)).to.be.null;
            expect(inet_ipv4.ntoa(1.5)).to.be.null;
        });
    });

    describe('#normalize()', function() {

        it('should return correct values for valid inputs', function() {
            expect(inet_ipv4.normalize('0')).equal('0.0.0.0');
            expect(inet_ipv4.normalize('255.255.255.255')).equal('255.255.255.255');
            expect(inet_ipv4.normalize('255.0xffffff')).equal('255.255.255.255');
            expect(inet_ipv4.normalize('255.255.0xffff')).equal('255.255.255.255');
            expect(inet_ipv4.normalize('255.255.0xffff')).equal('255.255.255.255');
            expect(inet_ipv4.normalize('4278190081')).equal('255.0.0.1');
            expect(inet_ipv4.normalize('0xff000001')).equal('255.0.0.1');
            expect(inet_ipv4.normalize('037700000001')).equal('255.0.0.1');
            expect(inet_ipv4.normalize('255.01')).equal('255.0.0.1');
        });

        it('should return null for invalid inputs', function() {
            expect(inet_ipv4.normalize('256.1')).be.null;
            expect(inet_ipv4.normalize('x1')).be.null;
            expect(inet_ipv4.normalize('1x')).be.null;
            expect(inet_ipv4.normalize('1.1.1.1.1')).be.null;
        });
    });

    describe('#validate()', function() {
        it('should return true for valid inputs', function() {
            expect(inet_ipv4.isValid('255.255.255.255')).equals(true);
            expect(inet_ipv4.isValid('0.0.0.0')).equals(true);
        });

        it('should return false for invalid inputs', function() {
            expect(inet_ipv4.isValid('256.1.1.1')).equals(false);
            expect(inet_ipv4.isValid('.1.1.1')).equals(false);
            expect(inet_ipv4.isValid('0.1.1')).equals(false);
        });
    });
});
