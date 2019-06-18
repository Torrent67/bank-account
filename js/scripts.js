// Input Name + Initial Deposit -> Object Account
// Input deposit or withdraw -> affect Account
// Display Current Blance
$(function(){
  function Bank () {
    this.accounts = [],
    this.currentId= 0
  }

  Bank.prototype.addAccount = function (newAccount) {
    newAccount.id = this.assignId();
    this.accounts.push(newAccount);
  }
  Bank.prototype.assignId = function () {
    this.currentId +=1;
    return this.currentId;
  }

  Bank.prototype.findAccount = function(name, id) {
    for (var i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].name === name || this.accounts[i].id == id) {
        return this.accounts[i];
      }
    };
    return false;
  }


  function Account (name, balance) {
    this.name = name,
    this.balance = balance
    this.deposits = [balance],
    this.withdraws = [0]
  }

  Account.prototype.Deposit = function(deposit) {
    this.balance += deposit;
    this.deposits.push(deposit);
    return this.balance;
  }
  Account.prototype.Withdraw = function(withdraw) {
    this.withdraws.push(withdraw);
    this.balance -= withdraw;
    return this.balance;
  }


  var bank = new Bank ();
  var name;
  var balance;


  $("#newaccount").submit(function(event){
    event.preventDefault();
    name = $("input#name").val();
    balance = parseInt($("input#start").val());
    var newAccount = new Account(name,balance);
    bank.addAccount(newAccount);
    $("#current").text(newAccount.balance);

    $("#existing").submit(function(event){
      event.preventDefault();
      var existName = $("input#nameSearch").val();
      var existId= $("input#acctnum").val();
      newAccount = bank.findAccount(existName, existId);
      $("#current").text(newAccount.balance);
    })
    $("#deposit").submit(function(event){
      event.preventDefault();
      var deposit = parseInt($("input#deposit").val());
      newAccount.Deposit(deposit);
      $("#current").text(newAccount.balance);
    });
    $("#withdraw").submit(function(event){
      event.preventDefault();
      var withdraw = parseInt($("input#withdraw").val());
      newAccount.Withdraw(withdraw);
      $("#current").text(newAccount.balance);
    });
    $("#btnDHistory").click(function(){
      $("#dHistory").empty();
      var number = newAccount.deposits.length-1;
      for (i=0; i <10; i++) {
        $("#dHistory").append("<li>" +newAccount.deposits[number]+"</li>")
        number--;
      }
    })
    $("#btnWHistory").click(function(){
      $("#wHistory").empty();
      var number = newAccount.withdraws.length-1;
      for (i=0; i <10; i++) {
        $("#wHistory").append("<li>" +newAccount.withdraws[number]+"</li>")
        number--;
      }
    })
  });
});
